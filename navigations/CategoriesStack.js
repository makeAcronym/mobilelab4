import { createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductDetails from '../screens/ProductDetails';
import Categories from '../screens/Categories';

const Stack = createNativeStackNavigator();
export default function CategoriesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Categories"
                component={Categories}
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