import githubIcon from "../../public/github.svg"

export default function Footer() {
    return (
        <div className="w-full text-center text-neutral-200 text-xs py-3 border-t border-neutral-700 bg-neutral-800">
            <p>
                Developed by João Paulo C. &copy; 2024 -{" "}
                <a
                    href="https://github.com/JoaoPauloK"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    JoaoPauloK  
                    <img src={githubIcon} alt="GitHub" className="inline w-4 h-4 mb-1 text-zinc-50 mx-1" />
                    
                </a>
            </p>
        </div>
    );
}