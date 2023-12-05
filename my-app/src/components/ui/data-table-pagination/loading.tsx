import { Skeleton } from "../skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table/TableNew";

interface DataTableLoadingProps {
  columnCount: number;
  rowCount?: number;
}

export function DataTableLoading({ columnCount, rowCount = 10 }: DataTableLoadingProps) {
  return (
    <div className="w-full space-y-3 overflow-auto">
      <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
        <div className="flex flex-1 items-center space-x-2">
          <Skeleton>
            <div className="h-7 w-[150px] lg:w-[250px]" />
          </Skeleton>
          <Skeleton className="border-dashed">
            <div className="h-7 w-[70px] " />
          </Skeleton>
        </div>
        <Skeleton className="ml-auto hidden lg:flex">
          <div className="h-7 w-[70px]  " />
        </Skeleton>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {Array.from({ length: 1 }).map((_, i) => (
              <TableRow key={i} className="hover:bg-transparent">
                {Array.from({ length: columnCount }).map((_, i) => (
                  <TableHead key={i}>
                    <Skeleton className="">
                      <div className="h-6 w-full" />
                    </Skeleton>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableRow key={i} className="hover:bg-transparent">
                {Array.from({ length: columnCount }).map((_, i) => (
                  <TableCell key={i}>
                    <Skeleton className="">
                      <div className="h-6 w-full" />
                    </Skeleton>{" "}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex w-full flex-col items-center justify-between gap-4 overflow-auto px-2 py-1 sm:flex-row sm:gap-8">
        <div className="flex-1">
          <Skeleton className="">
            <div className="h-8 w-40" />
          </Skeleton>
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <Skeleton className="">
              <div className="h-8 w-24" />
            </Skeleton>
            <Skeleton className="">
              <div className="h-8 w-[70px]" />
            </Skeleton>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            <Skeleton className="">
              <div className="h-8 w-20" />
            </Skeleton>
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="hidden lg:block">
              <div className="h-8 w-8 " />
            </Skeleton>
            <Skeleton className="">
              <div className="h-8 w-20" />
            </Skeleton>
            <Skeleton className="">
              <div className="h-8 w-20" />
            </Skeleton>
            <Skeleton className="hidden lg:block">
              <div className="h-8 w-8 " />
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}
