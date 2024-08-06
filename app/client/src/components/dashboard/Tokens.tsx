import React, { useState } from 'react'
import TokenComponent from './TokenComponent'
import { AssetItemProps } from '../../utils/interfaces'
import { assetsItems } from '../../utils/constants'
import TokenModal from './modal/TokenModal'

const Tokens: React.FC = () => {
    const [token, setToken] = useState<AssetItemProps | null>(null)

    const handleSend = (token: AssetItemProps) => {

    return (
        <>
            {token?.name && <TokenModal token={token} onClose={setToken} />}
            <div className="bg-dark p-10 rounded-lg">
                <h2 className="font-Inter font-semibold text-2xl pb-5">
                    Tokens
                </h2>
                <TokenComponent tokens={assetsItems} onSend={handleSend} />
            </div>
        </>
    )
}

export default Tokens
