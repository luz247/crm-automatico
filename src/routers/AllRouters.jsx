import React, { useEffect } from 'react';
import { useAuthStore } from '../hooks/useAuthStore';
import { LoginPages } from '../auth/LoginPages';
import { AppRouters } from './AppRouters';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useCrmStore } from '../hooks/useCrmStore';

export const AllRouters = () => {
    const { setInfoAll, allInfo, bacgroundWallet, setGetData, showAllPhono, numeroCartera } = useCrmStore();
    const { startLogin } = useAuthStore()

    const location = useLocation();
    const [, company, tipo] = location.pathname.split("/");
    const params = new URLSearchParams(location.search);
    const rut = params.get("user");
    const vendorId = params.get("vendor_id");

    useEffect(() => {
        const fetchData = async () => {
            if (vendorId) {

                setGetData({ path: company, rut: vendorId });

            }
        };

        fetchData();
    }, [vendorId, allInfo]);


    useEffect(() => {
        console.log({ company }, 'color de background')
        if (company != '') {
            bacgroundWallet({company});
            setInfoAll({ company })
            startLogin({ rut: rut, company: company });
        }
    }, [company]);




    useEffect(() => {
        if (numeroCartera != undefined) {
            const loadPhonos = async () => {
                console.log(numeroCartera, 'soy la carteraa numero')
                await showAllPhono(vendorId)
            }
            loadPhonos()
        }


    }, [numeroCartera])





    return (
        <Routes>

            <Route path="/*" element={<AppRouters />} />

        </Routes>
    );
};
