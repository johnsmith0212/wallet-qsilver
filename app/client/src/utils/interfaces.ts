type ModeProps = {
    wsUrl: string;
    type: 'mainnet' | 'testnet';
    // add some more if need
}

type SelectOption = {
    name: string;
    iconUrl: string;
};

type SidebarItemProps = {
    icon: string;
    label: string;
    link: string;
    active?: boolean;
    onClick?: () => void;
};


type SummaryItemProps = {
    icon: string;
    label: string;
    amount: string;
};

type AssetItemProps = {
    icon: string;
    name: string;
    amount: string;
    percentage: number;
    colorClassName: string;
};
