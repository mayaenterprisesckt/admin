import CardPageVisits from "@/components/Card/CardPageVisits";
import CardSocialTraffic from "@/components/Card/CardSocialTraffic";
import HeaderStats from "@/containers/Headers/HeaderStats";
function Home() {
    return (
        <>
            <HeaderStats />
            <div>
                <div className="flex flex-wrap mt-4">
                    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                        <CardPageVisits />
                    </div>
                    <div className="w-full xl:w-4/12 px-4">
                        <CardSocialTraffic />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
