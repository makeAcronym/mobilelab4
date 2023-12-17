import { createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductDetails from '../screens/ProductDetails';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();
export default function HomeStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: true}}
            />
            <Stack.Screen
                name="Product Details"
                component={ProductDetails}
                options={{headerShown: true}}
            />
        </Stack.Navigator>
    );
}