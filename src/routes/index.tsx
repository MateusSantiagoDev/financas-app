import { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/auth';
import { AppRouter } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
    const { signed } = useContext<any>(AuthContext);

 /*    if(loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#131313" />
            </View>
        );
    } */
    // signed vai verificar se tem usuário logado
    return (
        signed ? <AppRouter/> : <AuthRoutes/>
    )
}