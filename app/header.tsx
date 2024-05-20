import Link from "next/link"

export default function Header() {
    return (
        <header className="fixed bg-white shadow-md pb-0 w-full mb-0">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center ml-2">
                    <img
                        src="https://via.placeholder.com/40"
                        alt="Logo"
                        className="w-10 h-10 rounded-full"
                    />
                    <h1 className="ml-4 text-2xl font-bold text-gray-800">branson.mom</h1>
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
