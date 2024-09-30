import Skeleton from "@mui/material/Skeleton";

export const ProductSekleton = () => {
    return(
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex flex-col w-full md:w-1/2">
                <Skeleton variant="rectangular" width="80%" height={30} className="mx-auto mb-[2%]" />
                <Skeleton variant="rectangular" width="80%" height={20} className="mx-auto mb-[1%]" />
                <Skeleton variant="rectangular" width="80%" height={10} className="mx-auto mb-[1%]" />
                <Skeleton variant="rectangular" width="80%" height={10} className="mx-auto mb-[1%]" />
                <Skeleton variant="rectangular" width="80%" height={10} className="mx-auto mb-[1%]" />
                <Skeleton variant="rectangular" width="80%" height={10} className="mx-auto mb-[1%]" />
                <Skeleton variant="rectangular" width="80%" height={10} className="mx-auto mb-[1%]" />
                <Skeleton variant="rectangular" width="80%" height={10} className="mx-auto mb-[1%]" />
                <Skeleton variant="rectangular" width="80%" height={10} className="mx-auto mb-[1%]" />
                <Skeleton variant="rectangular" width="80%" height={10} className="mx-auto mb-[1%]" />
                <Skeleton variant="rectangular" width="80%" height={10} className="mx-auto mb-[1%]" />
                <Skeleton variant="rectangular" width="80%" height={10} className="mx-auto mb-[1%]" />
                <Skeleton variant="rectangular" width="80%" height={10} className="mx-auto mb-[1%]" />
                <Skeleton variant="rectangular" width="80%" height={10} className="mx-auto mb-[1%]" />
                <Skeleton variant="rectangular" width="80%" height={10} className="mx-auto mb-[1%]" />
            </div>
            <div className="flex w-full md:w-1/2">
                <Skeleton variant="rectangular" width="80%" height={300} className="mx-auto mb-[2%]" />
            </div>
         </div>
    )
}