export default function ColumnGridWrap ({children, cols = '2', gap = '6', responsive = 'on' , className: classes = ''}) {
    const getCols = () => {
        switch (cols) {
            case '1' : return responsive === 'on' ? 'md:grid-cols-1' : 'grid-cols-1'
            case '2' : return responsive === 'on' ? 'md:grid-cols-2' : 'grid-cols-2'
            case '3' : return responsive === 'on' ? 'md:grid-cols-3' : 'grid-cols-3'
            case '4' : return responsive === 'on' ? 'md:grid-cols-4' : 'grid-cols-4'
            default: return responsive === 'on' ? 'md:grid-cols-1' : 'grid-cols-1'
        }
    }

    const getGap = () => {
        switch (gap) {
            case '2' : return 'gap-2'
            case '3' : return 'gap-3'
            case '4' : return 'gap-4'
            case '5' : return 'gap-5'
            case '6' : return 'gap-6'
            case '7' : return 'gap-7'
            case '8' : return 'gap-8'
            default: return 'gap-2'
        }
    }

    return (
        <div className={`grid ${getCols()} ${getGap()} ${classes}`}>
            {children}
        </div>
    )
}