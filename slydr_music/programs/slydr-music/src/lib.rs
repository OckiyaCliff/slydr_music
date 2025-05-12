use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer, MintTo};
use anchor_spl::associated_token::AssociatedToken;
use std::mem::size_of;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

// Platform fee percentage (3%)
const PLATFORM_FEE_PERCENTAGE: u64 = 3;
// Fixed point scale for percentages (6 decimal places)
const PERCENTAGE_SCALE: u64 = 1_000_000;

#[program]
pub mod slydr_music {
    use super::*;

    pub fn initialize_platform(ctx: Context<InitializePlatform>) -> Result<()> {
        let platform = &mut ctx.accounts.platform;
        platform.authority = ctx.accounts.authority.key();
        platform.artist_count = 0;
        platform.investor_count = 0;
        platform.total_royalties_distributed = 0;
        platform.total_fees_collected = 0;
        Ok(())
    }

    pub fn register_artist(
        ctx: Context<RegisterArtist>,
        name: String,
        genre: String,
        bio: String,
    ) -> Result<()> {
        let artist = &mut ctx.accounts.artist;
        let platform = &mut ctx.accounts.platform;

        artist.authority = ctx.accounts.authority.key();
        artist.name = name;
        artist.genre = genre;
        artist.bio = bio;
        artist.total_raised = 0;
        artist.royalty_tokens_minted = 0;
        artist.royalty_tokens_available = 0;
        artist.campaign_count = 0;
        artist.investor_count = 0;

        platform.artist_count = platform.artist_count.checked_add(1).unwrap();

        Ok(())
    }

    pub fn create_funding_campaign(
        ctx: Context<CreateFundingCampaign>,
        title: String,
        description: String,
        goal_amount: u64,
        royalty_percentage: u64,
        duration_days: u16,
    ) -> Result<()> {
        // Validate royalty percentage (using fixed point scale)
        require!(
            royalty_percentage > 0 && royalty_percentage <= 50 * PERCENTAGE_SCALE,
            SlydrError::InvalidRoyaltyPercentage
        );

        let campaign = &mut ctx.accounts.campaign;
        let artist = &mut ctx.accounts.artist;
        let escrow = &mut ctx.accounts.campaign_escrow;

        // Initialize campaign data
        campaign.artist = artist.key();
        campaign.title = title;
        campaign.description = description;
        campaign.goal_amount = goal_amount;
        campaign.amount_raised = 0;
        campaign.royalty_percentage = royalty_percentage;
        campaign.start_time = Clock::get()?.unix_timestamp;
        campaign.end_time = Clock::get()?.unix_timestamp + (duration_days as i64 * 86400); // 86400 seconds in a day
        campaign.is_active = true;
        campaign.investor_count = 0;
        campaign.state = CampaignState::Active;
        campaign.escrow = escrow.key();
        campaign.token_mint = ctx.accounts.token_mint.key();

        // Initialize token mint for royalty tokens
        let cpi_accounts = MintTo {
            mint: ctx.accounts.token_mint.to_account_info(),
            to: ctx.accounts.artist_token_account.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        
        // Mint initial supply to artist (100% of tokens)
        let initial_supply = 1_000_000_000; // 1 billion tokens
        token::mint_to(cpi_ctx, initial_supply)?;

        artist.campaign_count = artist.campaign_count.checked_add(1).unwrap();

        Ok(())
    }

    pub fn invest_in_campaign(
        ctx: Context<InvestInCampaign>,
        amount: u64,
    ) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        let investor = &mut ctx.accounts.investor;
        let platform = &mut ctx.accounts.platform;
        let artist = &mut ctx.accounts.artist;

        // Check if campaign is active
        require!(campaign.is_active, SlydrError::CampaignNotActive);
        require!(campaign.state == CampaignState::Active, SlydrError::CampaignNotActive);
        require!(
            Clock::get()?.unix_timestamp <= campaign.end_time,
            SlydrError::CampaignEnded
        );

        // Check if investment would exceed goal
        let new_total = campaign.amount_raised.checked_add(amount).unwrap();
        require!(
            new_total <= campaign.goal_amount,
            SlydrError::ExceedsGoalAmount
        );

        // Calculate platform fee (3% of investment amount)
        let platform_fee = amount
            .checked_mul(PLATFORM_FEE_PERCENTAGE)
            .unwrap()
            .checked_div(100)
            .unwrap();
        
        // Amount that goes to the campaign after fee
        let campaign_amount = amount.checked_sub(platform_fee).unwrap();

        // Transfer SOL from investor to campaign escrow
        let transfer_to_campaign_instruction = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.investor_authority.key(),
            &ctx.accounts.campaign_escrow.key(),
            campaign_amount,
        );

        anchor_lang::solana_program::program::invoke(
            &transfer_to_campaign_instruction,
            &[
                ctx.accounts.investor_authority.to_account_info(),
                ctx.accounts.campaign_escrow.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        // Transfer platform fee to platform authority
        let transfer_fee_instruction = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.investor_authority.key(),
            &platform.authority,
            platform_fee,
        );

        anchor_lang::solana_program::program::invoke(
            &transfer_fee_instruction,
            &[
                ctx.accounts.investor_authority.to_account_info(),
                ctx.accounts.platform_authority.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        // Calculate investor's share of royalty tokens
        let investment_percentage = (campaign_amount as u128)
            .checked_mul(PERCENTAGE_SCALE as u128)
            .unwrap()
            .checked_div(campaign.goal_amount as u128)
            .unwrap() as u64;
        
        let royalty_share = (investment_percentage as u128)
            .checked_mul(campaign.royalty_percentage as u128)
            .unwrap()
            .checked_div(PERCENTAGE_SCALE as u128)
            .unwrap() as u64;

        // Calculate token amount to transfer to investor
        let token_amount = (1_000_000_000 as u128)
            .checked_mul(royalty_share as u128)
            .unwrap()
            .checked_div(PERCENTAGE_SCALE as u128)
            .unwrap() as u64;

        // Transfer royalty tokens from artist to investor
        let transfer_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.artist_token_account.to_account_info(),
                to: ctx.accounts.investor_token_account.to_account_info(),
                authority: ctx.accounts.artist_authority.to_account_info(),
            },
        );
        token::transfer(transfer_ctx, token_amount)?;

        // Update campaign and investor data
        campaign.amount_raised = campaign.amount_raised.checked_add(campaign_amount).unwrap();
        
        // If this is a new investor for this campaign
        if investor.invested_amount == 0 {
            campaign.investor_count = campaign.investor_count.checked_add(1).unwrap();
            artist.investor_count = artist.investor_count.checked_add(1).unwrap();
        }
        
        investor.invested_amount = investor.invested_amount.checked_add(campaign_amount).unwrap();
        investor.royalty_share = royalty_share;
        investor.token_amount = investor.token_amount.checked_add(token_amount).unwrap();

        // If this is a new investor on the platform
        if !investor.is_registered {
            investor.is_registered = true;
            platform.investor_count = platform.investor_count.checked_add(1).unwrap();
        }

        // Update platform stats
        platform.total_fees_collected = platform.total_fees_collected.checked_add(platform_fee).unwrap();

        // Check if campaign is now fully funded
        if campaign.amount_raised >= campaign.goal_amount {
            campaign.state = CampaignState::Successful;
        }

        Ok(())
    }

    pub fn distribute_royalties(
        ctx: Context<DistributeRoyalties>,
        amount: u64,
    ) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        let platform = &mut ctx.accounts.platform;
        
        // Ensure campaign was successful
        require!(
            campaign.state == CampaignState::Successful,
            SlydrError::CampaignNotSuccessful
        );
        
        // Calculate platform fee (3% of royalty amount)
        let platform_fee = amount
            .checked_mul(PLATFORM_FEE_PERCENTAGE)
            .unwrap()
            .checked_div(100)
            .unwrap();
        
        // Amount that goes to investors after fee
        let distribution_amount = amount.checked_sub(platform_fee).unwrap();

        // Transfer SOL to the royalty distribution account
        let transfer_to_distribution_instruction = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.authority.key(),
            &ctx.accounts.royalty_distribution_account.key(),
            distribution_amount,
        );

        anchor_lang::solana_program::program::invoke(
            &transfer_to_distribution_instruction,
            &[
                ctx.accounts.authority.to_account_info(),
                ctx.accounts.royalty_distribution_account.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        // Transfer platform fee to platform authority
        let transfer_fee_instruction = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.authority.key(),
            &platform.authority,
            platform_fee,
        );

        anchor_lang::solana_program::program::invoke(
            &transfer_fee_instruction,
            &[
                ctx.accounts.authority.to_account_info(),
                ctx.accounts.platform_authority.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        // Update platform stats
        platform.total_royalties_distributed = platform.total_royalties_distributed.checked_add(distribution_amount).unwrap();
        platform.total_fees_collected = platform.total_fees_collected.checked_add(platform_fee).unwrap();

        Ok(())
    }

    pub fn claim_royalty(ctx: Context<ClaimRoyalty>) -> Result<()> {
        let campaign = &ctx.accounts.campaign;
        let investor = &ctx.accounts.investor;
        let royalty_distribution = &ctx.accounts.royalty_distribution_account;
        
        // Ensure campaign was successful
        require!(
            campaign.state == CampaignState::Successful,
            SlydrError::CampaignNotSuccessful
        );
        
        // Calculate investor's share of royalties
        let total_royalty_balance = royalty_distribution.lamports();
        let investor_share = (total_royalty_balance as u128)
            .checked_mul(investor.royalty_share as u128)
            .unwrap()
            .checked_div(PERCENTAGE_SCALE as u128)
            .unwrap() as u64;
        
        // Transfer SOL from royalty distribution account to investor
        **royalty_distribution.try_borrow_mut_lamports()? = royalty_distribution
            .lamports()
            .checked_sub(investor_share)
            .unwrap();
            
        **ctx.accounts.investor_authority.try_borrow_mut_lamports()? = ctx
            .accounts
            .investor_authority
            .lamports()
            .checked_add(investor_share)
            .unwrap();
            
        Ok(())
    }

    pub fn finalize_campaign(ctx: Context<FinalizeCampaign>) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        let escrow = &ctx.accounts.campaign_escrow;
        
        // Check if campaign has ended
        require!(
            Clock::get()?.unix_timestamp > campaign.end_time,
            SlydrError::CampaignNotEnded
        );
        
        // Determine campaign outcome
        if campaign.amount_raised >= campaign.goal_amount {
            // Campaign successful - transfer funds to artist
            campaign.state = CampaignState::Successful;
            
            let escrow_balance = escrow.lamports();
            **escrow.try_borrow_mut_lamports()? = escrow
                .lamports()
                .checked_sub(escrow_balance)
                .unwrap();
                
            **ctx.accounts.artist_authority.try_borrow_mut_lamports()? = ctx
                .accounts
                .artist_authority
                .lamports()
                .checked_add(escrow_balance)
                .unwrap();
        } else {
            // Campaign failed - mark for refunds
            campaign.state = CampaignState::Failed;
        }
        
        campaign.is_active = false;
        
        Ok(())
    }

    pub fn refund_investment(ctx: Context<RefundInvestment>) -> Result<()> {
        let campaign = &ctx.accounts.campaign;
        let investor = &mut ctx.accounts.investor;
        let escrow = &ctx.accounts.campaign_escrow;
        
        // Ensure campaign failed
        require!(
            campaign.state == CampaignState::Failed,
            SlydrError::CampaignNotFailed
        );
        
        // Ensure investor has invested
        require!(
            investor.invested_amount > 0,
            SlydrError::NoInvestmentToRefund
        );
        
        // Transfer SOL from escrow to investor
        let refund_amount = investor.invested_amount;
        **escrow.try_borrow_mut_lamports()? = escrow
            .lamports()
            .checked_sub(refund_amount)
            .unwrap();
            
        **ctx.accounts.investor_authority.try_borrow_mut_lamports()? = ctx
            .accounts
            .investor_authority
            .lamports()
            .checked_add(refund_amount)
            .unwrap();
            
        // Reset investor's investment amount
        investor.invested_amount = 0;
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializePlatform<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + size_of::<PlatformAccount>()
    )]
    pub platform: Account<'info, PlatformAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RegisterArtist<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + size_of::<ArtistAccount>() + 256 // Extra space for strings
    )]
    pub artist: Account<'info, ArtistAccount>,
    #[account(mut)]
    pub platform: Account<'info, PlatformAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateFundingCampaign<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + size_of::<CampaignAccount>() + 512 // Extra space for strings
    )]
    pub campaign: Account<'info, CampaignAccount>,
    #[account(
        mut,
        constraint = artist.authority == authority.key() @ SlydrError::NotArtistOwner
    )]
    pub artist: Account<'info, ArtistAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    
    // Campaign escrow account to hold SOL
    #[account(
        init,
        payer = authority,
        space = 0,
        seeds = [b"escrow", campaign.key().as_ref()],
        bump
    )]
    pub campaign_escrow: SystemAccount<'info>,
    
    // Token mint for royalty tokens
    #[account(
        init,
        payer = authority,
        mint::decimals = 9,
        mint::authority = authority,
    )]
    pub token_mint: Account<'info, Mint>,
    
    // Artist's token account to receive initial supply
    #[account(
        init_if_needed,
        payer = authority,
        associated_token::mint = token_mint,
        associated_token::authority = authority,
    )]
    pub artist_token_account: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct InvestInCampaign<'info> {
    #[account(mut)]
    pub campaign: Account<'info, CampaignAccount>,
    #[account(
        init_if_needed,
        payer = investor_authority,
        space = 8 + size_of::<InvestorAccount>(),
        seeds = [b"investor", investor_authority.key().as_ref(), campaign.key().as_ref()],
        bump
    )]
    pub investor: Account<'info, InvestorAccount>,
    #[account(mut)]
    pub platform: Account<'info, PlatformAccount>,
    #[account(mut)]
    pub artist: Account<'info, ArtistAccount>,
    
    // Campaign escrow account
    #[account(
        mut,
        seeds = [b"escrow", campaign.key().as_ref()],
        bump,
    )]
    pub campaign_escrow: SystemAccount<'info>,
    
    // Token accounts
    #[account(
        mut,
        constraint = artist_token_account.mint == campaign.token_mint,
        constraint = artist_token_account.owner == artist_authority.key(),
    )]
    pub artist_token_account: Account<'info, TokenAccount>,
    
    #[account(
        init_if_needed,
        payer = investor_authority,
        associated_token::mint = campaign.token_mint,
        associated_token::authority = investor_authority,
    )]
    pub investor_token_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub investor_authority: Signer<'info>,
    #[account(mut, constraint = artist_authority.key() == artist.authority)]
    pub artist_authority: Signer<'info>,
    
    /// CHECK: This is the platform authority that receives fees
    #[account(mut, constraint = platform_authority.key() == platform.authority)]
    pub platform_authority: AccountInfo<'info>,
    
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct DistributeRoyalties<'info> {
    #[account(mut)]
    pub campaign: Account<'info, CampaignAccount>,
    #[account(mut)]
    pub platform: Account<'info, PlatformAccount>,
    
    // Royalty distribution account
    #[account(
        init_if_needed,
        payer = authority,
        space = 0,
        seeds = [b"royalty", campaign.key().as_ref()],
        bump
    )]
    pub royalty_distribution_account: SystemAccount<'info>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    /// CHECK: This is the platform authority that receives fees
    #[account(mut, constraint = platform_authority.key() == platform.authority)]
    pub platform_authority: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct ClaimRoyalty<'info> {
    pub campaign: Account<'info, CampaignAccount>,
    #[account(
        seeds = [b"investor", investor_authority.key().as_ref(), campaign.key().as_ref()],
        bump,
        constraint = investor.invested_amount > 0,
    )]
    pub investor: Account<'info, InvestorAccount>,
    
    // Royalty distribution account
    #[account(
        mut,
        seeds = [b"royalty", campaign.key().as_ref()],
        bump
    )]
    pub royalty_distribution_account: SystemAccount<'info>,
    
    #[account(mut)]
    pub investor_authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct FinalizeCampaign<'info> {
    #[account(
        mut,
        constraint = campaign.is_active == true,
        constraint = campaign.state == CampaignState::Active,
    )]
    pub campaign: Account<'info, CampaignAccount>,
    
    #[account(
        mut,
        seeds = [b"escrow", campaign.key().as_ref()],
        bump,
    )]
    pub campaign_escrow: SystemAccount<'info>,
    
    #[account(
        mut,
        constraint = artist.key() == campaign.artist,
    )]
    pub artist: Account<'info, ArtistAccount>,
    
    #[account(mut, constraint = artist_authority.key() == artist.authority)]
    pub artist_authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RefundInvestment<'info> {
    #[account(
        constraint = campaign.state == CampaignState::Failed,
    )]
    pub campaign: Account<'info, CampaignAccount>,
    
    #[account(
        mut,
        seeds = [b"investor", investor_authority.key().as_ref(), campaign.key().as_ref()],
        bump,
    )]
    pub investor: Account<'info, InvestorAccount>,
    
    #[account(
        mut,
        seeds = [b"escrow", campaign.key().as_ref()],
        bump,
    )]
    pub campaign_escrow: SystemAccount<'info>,
    
    #[account(mut)]
    pub investor_authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct PlatformAccount {
    pub authority: Pubkey,
    pub artist_count: u64,
    pub investor_count: u64,
    pub total_royalties_distributed: u64,
    pub total_fees_collected: u64,
}

#[account]
pub struct ArtistAccount {
    pub authority: Pubkey,
    pub name: String,
    pub genre: String,
    pub bio: String,
    pub total_raised: u64,
    pub royalty_tokens_minted: u64,
    pub royalty_tokens_available: u64,
    pub campaign_count: u64,
    pub investor_count: u64,
}

#[account]
pub struct CampaignAccount {
    pub artist: Pubkey,
    pub title: String,
    pub description: String,
    pub goal_amount: u64,
    pub amount_raised: u64,
    pub royalty_percentage: u64,  // Fixed point with PERCENTAGE_SCALE
    pub start_time: i64,
    pub end_time: i64,
    pub is_active: bool,
    pub investor_count: u64,
    pub state: CampaignState,
    pub escrow: Pubkey,
    pub token_mint: Pubkey,
}

#[account]
pub struct InvestorAccount {
    pub authority: Pubkey,
    pub invested_amount: u64,
    pub royalty_share: u64,  // Fixed point with PERCENTAGE_SCALE
    pub token_amount: u64,
    pub is_registered: bool,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum CampaignState {
    Active,
    Successful,
    Failed,
}

#[error_code]
pub enum SlydrError {
    #[msg("Invalid royalty percentage")]
    InvalidRoyaltyPercentage,
    #[msg("Campaign is not active")]
    CampaignNotActive,
    #[msg("Campaign has ended")]
    CampaignEnded,
    #[msg("Campaign has not ended yet")]
    CampaignNotEnded,
    #[msg("Not the artist owner")]
    NotArtistOwner,
    #[msg("Investment would exceed goal amount")]
    ExceedsGoalAmount,
    #[msg("Campaign was not successful")]
    CampaignNotSuccessful,
    #[msg("Campaign was not failed")]
    CampaignNotFailed,
    #[msg("No investment to refund")]
    NoInvestmentToRefund,
}
