import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function ExploreLoading() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="mt-2 h-4 w-[350px]" />
        </div>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <Skeleton className="h-10 w-full md:w-[300px]" />
        </div>
      </div>

      <Skeleton className="mb-8 h-10 w-[350px]" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-video w-full" />
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-6 w-[60px]" />
              </div>
              <Skeleton className="mt-2 h-4 w-[200px]" />
            </CardHeader>
            <CardContent className="pb-2">
              <Skeleton className="mb-2 h-2 w-full" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[40px]" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-9 w-[120px]" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
