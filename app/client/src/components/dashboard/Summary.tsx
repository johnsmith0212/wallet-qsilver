import React from 'react'
    const options = assetsItems.map((item) => ({
        label: item.icon,
        value: item.name,
    }))

    return (
        <div className="bg-dark rounded-lg p-5">

            <div className="flex flex-wrap justify-start gap-5 mb-5">
                {marketcap?.price &&
                    <SummaryItem
                        label="Total assets"
                        icon="/assets/images/dashboard/totalAssets.svg"
                        amount={`$${(Object.keys(balances).reduce((sum, key) => sum + balances[key], 0) * parseFloat(marketcap?.price)).toFixed(3)}`}
                    />
                }
                <SummaryItem
                    label="Total deposits"
                    icon="/assets/images/dashboard/totalDeposit.svg"
                    amount={`QU ${0}`}
                />
            </div>
            <TokenSelect options={options} />

            <MetricsChart />
        </div>
    )
}

export default Summary
