import { AssetItemProps, ModeProps, SidebarItemProps, SummaryItemProps } from "./interfaces";

const sideBarItems: SidebarItemProps[] = [
    {
        icon: '/assets/images/sidebar/dashboard.svg',
        label: 'Dashboard',
        active: true,
        link: '/dashboard',
    },
    {
        icon: '/assets/images/sidebar/trading.svg',
        label: 'Trading',
        active: false,
        link: '/trading',
    },
    {
        icon: '/assets/images/sidebar/accounts.svg',
        label: 'Accounts',
        active: false,
        link: '/accounts',
    },
    {
        icon: '/assets/images/sidebar/activity.svg',
        label: 'Activity',
        active: false,
        link: '/activity',
    },
    {
        icon: '/assets/images/sidebar/settings.svg',
        label: 'Settings',
        active: false,
        link: '/settings',
    },
    {
        icon: '/assets/images/ui/logout.svg',
        label: 'Log out',
        active: false,
        link: '/login',
    },
]

const summaryItems: SummaryItemProps[] = [
    {
        icon: '/assets/images/dashboard/totalAssets.svg',
        label: 'Total assets',
        amount: '87.743',
    },
    {
        icon: '/assets/images/dashboard/totalDeposit.svg',
        label: 'Total deposits',
        amount: '78.342',
    }
]

const summaryAccountItems: SummaryItemProps[] = [
    {
        icon: '/assets/images/dashboard/totalDeposit.svg',
        label: 'Balance',
        amount: '78.342',
    },
    {
        icon: '/assets/images/dashboard/totalAssets.svg',
        label: 'Ticks',
        amount: '87.743',
    }
]

const assetsItems: AssetItemProps[] = [
    {
        icon: '/assets/images/tokens/qu.svg',
        name: 'QU',
        amount: '29.9',
        percentage: 60,
        colorClassName: 'bg-[#FB03F5]',
    },
    {
        icon: '/assets/images/tokens/qtry.svg',
        name: 'QTRY',
        amount: '99',
        percentage: 30,
        colorClassName: 'bg-[#5CFF9C]',
    },
    {
        icon: '/assets/images/tokens/random.svg',
        name: 'RANDOM',
        amount: '99',
        percentage: 20,
        colorClassName: 'bg-[#FB035C]',
    },
    {
        icon: '/assets/images/tokens/qutil.svg',
        name: 'QUTIL',
        amount: '99',
        percentage: 20,
        colorClassName: 'bg-[#FB03F5]',
    },
    {
        icon: '/assets/images/tokens/qft.svg',
        name: 'QFT',
        amount: '99',
        percentage: 10,
        colorClassName: 'bg-[#50AF95]',
    },
]

const marketOptions = [
    {
        label: 'On',
        value: true
    },
    {
        label: 'Off',
        value: false
    },
]

const MODES: ModeProps[] = [
    {
        wsUrl: 'wss://qsilver.org:5555',
        type: 'mainnet',
    },
    {
        wsUrl: 'ws://93.190.141.12:5678',
        type: 'testnet',
    }
]

const SERVER_URL = "http://localhost:3000";

export { sideBarItems, summaryItems, assetsItems, summaryAccountItems, marketOptions, SERVER_URL, MODES };