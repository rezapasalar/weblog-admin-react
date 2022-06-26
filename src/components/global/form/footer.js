export default function Footer ({children, align = 'left', className: classes = ''}) {
    return (
        <div className={`${align === 'left' ? 'text-left' : 'text-right'} flex items-center justify-end space-x-reverse space-x-2 mt-8 ${classes}`}>
            {children}
        </div>
    )
}