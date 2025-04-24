import { axisClasses } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';

const Graphycs = () => { 
    const isSmallScreen = window.innerWidth < 1600;

    return (
        <div className='w-1/2'>
            <PieChart
                sx={{
                    [`.${axisClasses.root}`] : {
                        [`.${axisClasses.tick}, .${axisClasses.tickLabel}`]: {
                            stroke: 'white',
                            fill: 'white',
                    }}
                }}
                series={[
                    {
                        data: [
                            { id: 0, value: 10, label: 'series A', color: '#FF5733' },
                            { id: 1, value: 15, label: 'series B', color: '#33FF57' },
                            { id: 2, value: 20, label: 'series C', color: '#3357FF' },
                        ],
                    },
                ]}
                width={isSmallScreen ? 650 : 800}
                height={isSmallScreen ? 300 : 400}
                
            />
        </div>
    );
 }

 export default Graphycs