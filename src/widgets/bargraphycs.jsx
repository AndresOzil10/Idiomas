import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';

const BarGraphycs = () => { 
    const isSmallScreen = window.innerWidth < 1600;
    return <>
        <div className='w-1/2'>
            <BarChart
            xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
            series={[
                { data: [4, 3, 5], color: '#000000' },
                { data: [1, 6, 3], color: '#525252' },
                { data: [2, 5, 6], color: '#c4c8c5' }
            ]}
            width={isSmallScreen ? 650 : 800}
            height={isSmallScreen ? 300 : 400}
            />
        </div>
    </>
 }

 export default BarGraphycs