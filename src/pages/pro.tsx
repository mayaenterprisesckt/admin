import Auth from "@/components/hoc/Auth";
import Link from "next/link";

function pro() {
    return (
        <Auth>
            <div>this is Client Side protected route</div>
            <div>
                <Link href={"/"}>Pro</Link>
            </div>
        </Auth>
    );
}

export default pro;
