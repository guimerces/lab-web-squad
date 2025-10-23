import LoginForm from "../organisms/LoginForm";

export default function AuthTemplate(){
    return (
        <div className="flex min-h-screen flex items-center justify-center bg-gray-700">
            <main className="w-full max-w-md">
                <LoginForm />
            </main>

        </div>
    );
}