import React from 'react'

import SummaryItem from './SummaryItem'
import TokenSelect from './select/TokenSelect'
import { assetsItems } from '../../utils/constants'
import { useAuth } from '../../contexts/AuthContext'

const Summary: React.FC = () => {
    const {marketcap } = useAuth();
    
    const options = assetsItems.map((item) => ({
        label: item.icon,
        value: item.name,
    }))

    return (
        <div className="bg-dark rounded-lg p-5">
            <div className="mb-5">
                <SummaryItem 
                    label='Total assets'
                    icon='/assets/images/dashboard/totalAssets.svg'
                    amount={`$${marketcap?.marketcap}`}
                />
                <SummaryItem
                    label='Total deposits'
                    icon='/assets/images/dashboard/totalDeposit.svg'
                    amount={`QU ${marketcap?.supply}`}
                />
            </div>
            <TokenSelect options={options} />
            <div>
                <img src="/assets/images/dashboard/chat.svg" />
            </div>
        </div>
    )
}

export default Summary
