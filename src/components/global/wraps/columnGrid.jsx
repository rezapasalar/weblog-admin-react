export default function ColumnGridWrap ({children, cols = '2', gap = '6', responsive = 'on' , className: classes = ''}) {
    
    const gridCols = {
        responsive : {
            1: 'md:grid-cols-1',
            2: 'md:grid-cols-2',
            3: 'md:grid-cols-3',
            4: 'md:grid-cols-4',
        },
        notResponsive: {
            1: 'grid-cols-1',
            2: 'grid-cols-2',
            3: 'grid-cols-3',
            4: 'grid-cols-4',
        }
    }

    const gaps = {
        2: 'gap-2',
        3: 'gap-3',
        4: 'gap-4',
        5: 'gap-5',
        6: 'gap-6',
        7: 'gap-7',
        8: 'gap-8',
    }

    return (
        <div className={`grid ${gridCols[responsive ? 'responsive' : 'notResponsive'][cols]} ${gaps[gap]} ${classes}`}>
            {children}
        </div>
    )
}