import { shopProfile } from "../data/ordersdata";

function ShopPerformance({ activeCount, totalCount, outOfStockCount, totalRevenue, totalSold}) {
    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-4 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white border border-gray-300 flex flex-col gap-0.5 p-4 rounded-xl w-full">
                <p className="text-xs">
                    Total Revenue
                </p>
                <p className="font-bold text-xl">
                    Rp{totalRevenue.toLocaleString("id-ID")}
                </p>
                <p className="text-xs">
                    All time
                </p>
            </div>
            <div className="bg-white border border-gray-300 flex flex-col gap-0.5 p-4 rounded-xl w-full">
                <p className="text-xs">
                    Item Sold
                </p>
                <p className="font-bold text-xl">
                    {totalSold}
                </p>
                <p className="text-xs">
                    All time
                </p>
            </div>
            <div className="bg-white border border-gray-300 flex flex-col gap-0.5 p-4 rounded-xl w-full">
                <p className="text-xs">
                    Active Listings
                </p>
                <p className="font-bold text-xl">
                    {activeCount}
                </p>
                <p className="text-xs">
                    of {totalCount} total
                </p>
            </div>
            <div className="bg-white border border-gray-300 flex flex-col gap-0.5 p-4 rounded-xl w-full">
                <p className="text-xs">
                    Shop Rating
                </p>
                <p className="font-bold text-xl">
                    {shopProfile.rating}
                </p>
                <p className="text-xs">
                    {shopProfile.reviews} reviews
                </p>
            </div>
        </div>
    );
}

export default ShopPerformance;