export default function Table ({children, className: classes = ''}) {
    return (
        <div className={`my-4 overflow-y-auto ${classes}`}>
            <table className="w-full">
                {children}
            </table>
        </div>
    )
}