import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';

const BarGraphycs = () => { 
    const isSmallScreen = window.innerWidth < 1600;
    return <>
        <div className='w-1/2'>
            <BarChart
            sx={{
                [`.${axisClasses.root}`] : {
                    [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                        stroke: '#FFFFFF',
                        strokeWidth: 1,
                      },   
                    [`.${axisClasses.tickLabel}`]: {
                        fill: 'white',

                    },
                }
            }}
            xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
            series={[
                { data: [4, 3, 5], color: '#FF5733' },
                { data: [1, 6, 3], color: '#33FF57' },
                { data: [2, 5, 6], color: '#3357FF' }
            ]}
            width={isSmallScreen ? 650 : 800}
            height={isSmallScreen ? 300 : 400}
            />
        </div>
    </>
 }

 export default BarGraphycs