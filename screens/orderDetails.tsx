import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useStorage } from "../hooks/useStorage"
import { RootStackParamList } from "../types/types";
import { API_URL } from "@env";
import axios, { AxiosResponse } from "axios";

const OrderDetails = ({route, navigation}: NativeStackScreenProps<RootStackParamList, 'OrderDetails'>) => {
    // user
    const [user] = useStorage('user');

    const [orderDetails, setOrderDetails] = useState();
    const [loading, setLoading] = useState<boolean>(false);

    const { token, orderId } = route.params;

    // params
    const params = new URLSearchParams({
        token,
        //user_id: user.userId,
        //client_id: user.clientId,
        order_id: orderId,
    });

    useEffect(() => {
        // set loading true
        setLoading(true);
        axios
          .get(`${API_URL}/get-order-status?${params}`)
          .then((response: AxiosResponse) => {
            if (response.data.status === false) {
              console.log(response.data.status);
            } else {
              console.log(response.data.data);
            }
          })
          .catch(error => {
            console.log(error);
          });
        // set loading true
        setLoading(false);
    },[orderId])
}

export default OrderDetails;