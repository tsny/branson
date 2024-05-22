import Link from "next/link"

export default function Header() {
    return (
        <header className="fixed bg-white shadow-md pb-0 w-full">
            <div className="w-fill mx-auto flex items-center justify-between">
                <div className="flex items-center ml-2">
                    <img
                        src="https://t3.ftcdn.net/jpg/04/88/23/76/360_F_488237693_FNSP61ywk1MysxipZtbnTkKy2Rht2562.jpg"
                        alt="Logo"
                        className="w-10 h-10 rounded-full"
                    />
                    <h1 className="ml-4 text-2xl font-bold text-gray-800">
                        <Link href="/" className="text-gray-600 hover:text-gray-900"> branson.mom </Link>
                    </h1>
                </div>
                <nav className="space-x-4 mr-4">
                    <a href="/" className="text-gray-600 hover:text-gray-900">
                        Login
                    </a>
                    <Link href="/rules" className="text-gray-600 hover:text-gray-900"> Rules </Link>
                </nav>
            </div>
        </header>
    )
}
