import Languages from 'commons/languages';
import { Button } from 'components/button';
import { useAppStore } from 'hooks';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { userManager } = useAppStore();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('userManager = ', userManager.demo);
    }, [userManager.demo]);

    const onPress = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div>
            <p>
                Profile
            </p>

            <Button
                label={Languages.common.back}
                onPress={onPress}
                buttonStyle={'BLUE'}
            />
        </div>
    );
}

export default Profile;
