import { Pagination, PaginationItem } from "@mui/material";

import Button from "../../components/commons/Button";
import Title from "../../components/commons/Title";
import Layout from "../../components/layout"
import InnerContainer from "../../components/layout/InnerContainer";
import MainContent from "../../components/layout/MainContent";
import AccountSummary from "./AccountSummary";
import AccountGrid from "./AccountGrid";
import { useAuth } from "../../contexts/AuthContext";

type DataType = {
    address: string;
    balance: number;
}

const Accounts = () => {

    const { accountInfo, balances, handleAddAccount } = useAuth();
    const [data, setData] = useState<DataType[]>([]);


    useEffect(() => {
        accountInfo?.addresses.forEach((item) => {
            if (item !== "") {
                setData((currentData) => {
                    const idx = currentData.findIndex((temp) => temp.address === item);
                    const balance = balances[item] || 0;

                    if (idx === -1) {
                        // If the address doesn't exist, add it
                        return [...currentData, { address: item, balance }];
                    } else {
                        // If the address exists, update its balance
                        return currentData.map((dataItem, index) =>
                            index === idx ? { ...dataItem, balance } : dataItem
                        );
                    }
                });
            }
        });
    }, [accountInfo, balances]);
    
    const pagesTotal = Math.round(data.length / 10);

    const options = assetsItems.map((item) => ({
        label: item.icon,
        value: item.name,
    }));
                        </div>
                    </InnerContainer>
                </MainContent>
            </Layout>
        </>
    )
}

export default Accounts;