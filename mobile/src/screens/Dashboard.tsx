import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAdd,
  faCopy,
  faPlus,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
// import Clipboard from "@react-native-community/clipboard";
import tw from "tailwind-react-native-classnames";
import Toast from "react-native-toast-message";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
// import { setBalances, setMarketcap, setRichlist, setTokens } from "../redux/appSlice";
// import NetworkSwitcher from "../components/NetworkSwitcher";

type TransactionItem = [number, string, string, string];
type RichList = {
  name: string,
  richlist: [[number, string, string]],
};

interface AddressModalProps {
  isAccountModalOpen: boolean;
  toggleAccountModal: () => void;
  allAddresses: string[];
  handleCopy: (address: string) => void;
  handleAddAccount: () => void;
  setDeleteAccount: (address: string) => void;
  toggleDeleteAccountModal: () => void;
  handleClickAccount: (address: string) => void;
  addingStatus: boolean;
}

const AddressModal: React.FC<AddressModalProps> = ({
  isAccountModalOpen,
  toggleAccountModal,
  allAddresses,
  handleCopy,
  handleAddAccount,
  setDeleteAccount,
  toggleDeleteAccountModal,
  handleClickAccount,
  addingStatus,
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={isAccountModalOpen}
    onRequestClose={toggleAccountModal}
  >
    <View style={tw`m-4 bg-white rounded-lg p-4`}>
      <View
        style={tw`flex-row justify-between items-center border-b border-gray-200 pb-4`}
      >
        <Text style={tw`text-lg font-bold`}>Addresses</Text>
        <View style={tw`flex-row items-center`}>
          <Pressable onPress={handleAddAccount} disabled={addingStatus}>
            <FontAwesomeIcon
              icon={faPlus}
              size={24}
              color={addingStatus ? "gray" : "black"}
            />
          </Pressable>
          <Pressable onPress={toggleAccountModal} style={tw`ml-2`}>
            <FontAwesomeIcon icon={faTimes} size={24} color="black" />
          </Pressable>
        </View>
      </View>
      <ScrollView style={tw`max-h-[500px] mt-4`}>
        {allAddresses.map(
          (item, idx) =>
            item !== "" && (
              <View
                key={`address-${idx}`}
                style={tw`flex-row justify-between items-center py-2`}
              >
                <Pressable onPress={() => handleCopy(item)}>
                  <FontAwesomeIcon icon={faCopy} size={20} color="black" />
                </Pressable>
                <Text
                  onPress={() => handleClickAccount(item)}
                  style={tw`flex-1 mx-2 text-center`}
                >
                  {item}
                </Text>
                <Pressable
                  onPress={() => {
                    setDeleteAccount(item);
                    toggleDeleteAccountModal();
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} size={20} color="black" />
                </Pressable>
              </View>
            )
        )}
      </ScrollView>
    </View>
  </Modal>
);

const Dashboard: React.FC = () => {
<<<<<<< HEAD
  
=======
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


>>>>>>> origin/main
  const handleCopy = (text: string) => {
    // Clipboard.setString(text);
    Toast.show({ type: "success", text1: "Copied to clipboard" });
  };

  return (
    <ScrollView
      style={[
        tw`h-full px-2 py-5 shadow-2xl`,
        { backgroundColor: "rgba(3,35,61,0.8)" },
      ]}
    >
      <View
        style={tw`flex-row justify-between items-center border-b border-white px-5 py-2`}
      >
        <Pressable onPress={() => {}}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={tw`w-12 h-12`}
          />
        </Pressable>
        <Pressable onPress={() => handleCopy("")}>
          <Text style={tw`text-white text-lg px-2 py-2 shadow-lg rounded-md`}>
            {}
          </Text>
        </Pressable>
        <Pressable>
          <Text style={tw`text-white bg-blue-900 px-2 py-1 rounded-md text-lg`}>
            Logout
          </Text>
        </Pressable>
      </View>
      <View style={tw`px-5 py-2`}>
        <Text style={tw`text-white text-2xl`}>Balance:</Text>
        <Text style={tw`text-white text-2xl`}>Tick: </Text>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
