import {  PieChart } from '@mui/x-charts/PieChart';

const Graphycs = () => { 
    const isSmallScreen = window.innerWidth < 1600;

    return (
        <div className='w-1/2'>
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: 10, label: 'series A', color: '#000000' },
                            { id: 1, value: 15, label: 'series B', color: '#525252' },
                            { id: 2, value: 20, label: 'series C', color: '#c4c8c5' },
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