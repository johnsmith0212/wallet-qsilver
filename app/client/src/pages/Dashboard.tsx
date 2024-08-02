import { faCheck, faCopy, faPlus, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Modal from "../components/common/Modal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { handleCopy } from "../utils/helper";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { setBalances, setMarketcap, setRichlist, setTokens } from "../redux/appSlice";
import { TransactionItem } from "../utils/interfaces";
import NetworkSwitcher from "../components/NetworkSwitcher";

const Dashboard: React.FC = () => {
    const { login, logout, user } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [isAccountModalOpen, setIsAccountModalOpen] = useState<boolean>(false);
    const toggleAccountModal = () => setIsAccountModalOpen(!isAccountModalOpen);
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState<boolean>(false);
    const toggleDeleteAccountModal = () => setIsDeleteAccountModalOpen(!isDeleteAccountModalOpen);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState<boolean>(false);
    const toggleTransferModal = () => setIsTransferModalOpen(!isTransferModalOpen);

    const { tick, balances, tokens, richlist, marketcap } = useSelector((state: RootState) => state.app);

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [deleteAccount, setDeleteAccount] = useState<string>("");
    const [currentAddress, setCurrentAddress] = useState<string>("");
    const [displayAddress, setDisplayAddress] = useState(currentAddress);
    const [allAddresses, setAllAddresses] = useState<string[]>([]);
    const [addingStatus, setAddingStatus] = useState<boolean>(false);
    const [deletingStatus, setDeletingStatus] = useState<boolean>(false);
    const [toAddress, setToAddress] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [sendingStatus, setSendingStatus] = useState<'open' | 'pending' | 'closed' | 'rejected'>('closed');
    const [statusInterval, setStatusInterval] = useState<any>();
    const [sendingResult, setSendingResult] = useState<string>('');
    const [transactionId, setTrasactionId] = useState<string>('');
    const [expectedTick, setExpectedTick] = useState<number>();
    const [histories, setHistories] = useState<TransactionItem[]>([]);
    const [subTitle, setSubTitle] = useState<'Activity' | 'Token'>('Token');

    const handleAddAccount = () => {
        if (addingStatus) return;
        setAddingStatus(true);
        console.log(user?.password, user?.accountInfo.addresses.findIndex((item) => item == ""))
        axios.post(
            `${SERVER_URL}/api/add-account`,
            {
                password: user?.password,
                index: user?.accountInfo.addresses.findIndex((item) => item == "")
            }
        ).then((resp) => {
            console.log(resp.data);
            login(resp.data)
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setAddingStatus(false)
        })
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    const handleDeleteAccount = () => {
        if (deletingStatus) return;
        setDeletingStatus(true)
        if (deleteAccount != "")
            axios.post(
                `${SERVER_URL}/api/delete-account`,
                {
                    password: user?.password,
                    index: user?.accountInfo.addresses.indexOf(deleteAccount),
                    address: deleteAccount,
                }
            ).then((resp) => {
                if (user?.accountInfo.addresses.indexOf(deleteAccount) == 0) {
                    handleLogout();
                }
                // delete balances[deleteAccount];
                login(resp.data);
            }).catch(() => {

            }).finally(() => {
                toggleDeleteAccountModal();
                setDeletingStatus(false);
            })
    }

    const handleTransfer = () => {
        if (toAddress == "" || amount == "" || amount == "0") {
            toast.error(
                `Invalid address or amount!`
            );
            return;
        }
        setSendingStatus('open');
        const expectedTick = parseInt(tick) + 5;
        setExpectedTick(expectedTick);
        axios.post(
            `${SERVER_URL}/api/transfer`,
            {
                toAddress,
                fromIdx: allAddresses.indexOf(currentAddress),
                amount,
                tick: expectedTick,
            }
        ).then((resp) => {
            const _statusInterval = setInterval(() => {
                axios.post(
                    `${SERVER_URL}/api/transfer-status`
                ).then((resp) => {
                    console.log(resp.data);
                    if (resp.data.value.result == '0') {
                        setSendingStatus('pending');
                    } else if (resp.data.value.result == '1') {
                        setSendingResult(resp.data.value.display);
                        setSendingStatus('closed');
                    } else {
                        setSendingStatus('rejected');
                    }
                }).catch((error) => {
                    console.log(error.response);
                    setSendingStatus('rejected');
                })
            }, 2000)
            setStatusInterval(_statusInterval);
            console.log(resp.data);
            // setSendingStatus('closed');
        }).catch((_) => {
            setSendingStatus('rejected');
        }).finally(() => {
        });
    }

    const handleClickAccount = (address: string) => {
        setCurrentAddress(address);
        toggleAccountModal();
    }

    const handleSelectAccount = (address: string) => {
        setCurrentAddress(address);
    }

    useEffect(() => {
        if (sendingStatus == 'open' || sendingStatus == 'pending') {
            setIsTransferModalOpen(true);
        } else {
            // clearInterval(statusInterval);
        }
    }, [sendingStatus])

    useEffect(() => {
        if (user?.accountInfo) {
            setCurrentAddress(user?.accountInfo.addresses[0])
            setAllAddresses(user?.accountInfo.addresses)
        }

    }, [login, user])

    useEffect(() => {
        if (sendingResult.includes('broadcast for tick')) {
            const sendingResultSplit = sendingResult.split(' ');
            setTrasactionId(sendingResultSplit[1]);
            setExpectedTick(parseInt(sendingResultSplit[sendingResultSplit.length - 1]));
        } else if (sendingResult.includes('no command pending')) {
            clearInterval(statusInterval);
        }
    }, [sendingResult])

    useEffect(() => {
        // Assuming Tailwind's 'md' breakpoint is 768px
        if (screenWidth < 1024 && currentAddress.length > 6) {
            const sliceLength = Math.ceil(screenWidth * 20 / 1024);
            const modifiedAddress = `${currentAddress.slice(0, sliceLength)}...${currentAddress.slice(-sliceLength)}`;
            setDisplayAddress(modifiedAddress);
        } else {
            setDisplayAddress(currentAddress);
        }
    }, [screenWidth, currentAddress]);

    useEffect(() => {
        axios.post(
            `${SERVER_URL}/api/history`,
            {
                address: currentAddress
            }
        ).then((resp) => {
            if (resp.data.changes) {
                setHistories(resp.data.changes[1].txids)
            } else {
                setHistories([]);
            }
        }).catch((_) => {
            setHistories([]);
        })

        axios.post(
            `${SERVER_URL}/api/tokens`,
        ).then((resp) => {
            dispatch(setTokens(resp.data.tokens));
        }).catch((error) => {
            console.log(error.response);
        })

    }, [currentAddress])

    useEffect(() => {
        axios.post(
            `${SERVER_URL}/api/basic-info`
        ).then((resp) => {
            resp.data.balances.map((item: [number, string]) => {
                dispatch(setBalances({ index: item[0], balance: item[1] }));
            })
            dispatch(setTokens(resp.data.tokens));
            dispatch(setRichlist(resp.data.richlist));
            dispatch(setMarketcap(resp.data.marketcap));
            console.log(resp.data, 'basicinfo');
        })

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        <>

            <Layout>
                <div className="w-full grid grid-cols-[minmax(auto,calc(100%-270px))_250px] grid-rows-[auto_230px] gap-5">
                    <Summary />
                    <Assets />
                    <Tokens />
                    <Ads />
                </div>
            </div>
            <Modal isOpen={isAccountModalOpen}>
                <div className='flex justify-between p-[10px_16px] items-center border-b border-white text-[1.25rem]'>
                    <div>Addresses</div>
                    <div className="flex gap-[10px]">
                        <FontAwesomeIcon icon={faPlus} className={addingStatus ? `cursor-wait` : `cursor-pointer`} onClick={handleAddAccount} />
                        <FontAwesomeIcon icon={faTimes} className={`cursor-pointer`} onClick={toggleAccountModal} />
                    </div>
                </div>
                <div className="p-[10px_16px] max-h-[500px] overflow-y-auto mb-[10px]">
                    {
                        allAddresses.map((item, idx) => {
                            if (item != "")
                                return <div className="flex justify-between items-center gap-[20px]" key={`address-${idx}`}>
                                    <FontAwesomeIcon className="cursor-pointer" icon={faCopy} onClick={() => handleCopy(item)} />
                                    <span className="font-mono cursor-pointer" onClick={() => { handleClickAccount(item) }}>{item}</span>
                                    <FontAwesomeIcon className="cursor-pointer" icon={faTrash} onClick={() => { setDeleteAccount(item); toggleDeleteAccountModal(); }} />
                                </div>
                        })
                    }
                </div>
            </Modal>
            <Modal isOpen={isDeleteAccountModalOpen}>
                <div className='flex justify-between p-[10px_16px] items-center border-b border-white text-[1.25rem]'>
                    <div>Delete this account?</div>
                    <div className="flex gap-[10px]">
                        <FontAwesomeIcon icon={faTimes} onClick={toggleDeleteAccountModal} className='cursor-pointer' />
                    </div>
                </div>
                <div className="p-[10px_16px] max-h-[500px] overflow-y-auto mb-[10px]">
                    {deleteAccount}
                    <div className="flex justify-end gap-5 mt-[10px]">
                        <a className={(deletingStatus ? `cursor-wait` : `cursor-pointer`) + " bg-red-500 px-4 hover:bg-red-600"} onClick={handleDeleteAccount}>Yes</a>
                        <a className="cursor-pointer bg-[#5468ff] px-4 hover:bg-[#3f4cb1]" onClick={toggleDeleteAccountModal}>No</a>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={isTransferModalOpen}>
                {
                    (sendingStatus == 'closed' || sendingStatus == 'rejected') &&
                    <div className='flex justify-between p-[10px_16px] items-center text-[1.25rem] gap-5'>
                        {sendingResult == 'no command pending' ?
                            <div>Success</div> :
                            <div>{sendingStatus == 'closed' ? "Sending..." : "Failed"}</div>
                        }
                        <div className="gap-[10px]">
                            <FontAwesomeIcon icon={faTimes} onClick={toggleTransferModal} className='cursor-pointer' />
                        </div>
                    </div>
                }
                {
                    (sendingStatus == 'open' || sendingStatus == 'pending') ?
                        <div className="p-[10px_16px] max-h-[500px] overflow-y-auto my-[10px] flex flex-col gap-5 items-center">
                            {/* <div className="text-[24px]">Sending</div> */}
                            <ClipLoader />
                        </div> :
                        <>
                            {sendingStatus == 'closed' ?
                                <div className="max-w-md mx-auto bg-transparent overflow-hidden md:max-w-2xl my-4 px-8">
                                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Transaction ID</div>
                                    <p className="mt-1 text-lg font-mediu">{transactionId}</p>
                                    {
                                        sendingResult == 'no command pending' ?
                                            <>
                                                <div className="mt-4 font-[24px]">
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </div>
                                            </> :
                                            <>
                                                <div className="mt-2">
                                                    <span className="text-indigo-500 font-semibold">Expected Tick:</span> {expectedTick}
                                                </div>
                                                <div className="mt-2">
                                                    <span className="text-indigo-500 font-semibold">Status:</span> {sendingResult}
                                                </div>
                                            </>
                                    }
                                </div> :
                                <div className="p-[10px_16px] max-h-[500px] overflow-y-auto mb-[10px] flex flex-col gap-5 items-center">
                                    <div className="text-[24px]">Failed</div>
                                </div>
                            }
                        </>
                }
            </Modal>
        </>
    );
};

export default Dashboard;
