import React from 'react';
import {connect} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {withTranslation} from 'react-i18next';
import {StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import {ThemedView, Header} from 'src/components';
import {TextHeader, IconHeader} from 'src/containers/HeaderComponent';
import Container from 'src/containers/Container';
import Input from 'src/containers/input/Input';
import Button from 'src/containers/Button';
import {authSelector} from 'src/modules/auth/selectors';
import {validatorDeleteAccount} from 'src/modules/auth/validator';

import {margin} from 'src/components/config/spacing';
import {deleteAccount, deleteAccountSuccess, updateCustomer, updateUserSuccess} from "../../modules/auth/actions";
import {signOut} from 'src/modules/auth/actions';
import {mainStack} from "../../config/navigator";


class DeleteAccount extends React.Component {

    constructor(props) {
        super(props);
        const {
            auth: {user},
        } = props;
        this.state = {
            data: {
                password: '',

            },
            errors: null,
        };
    }

    handleDeleteAccount = () => {
        const {t, dispatch} = this.props;
        const {data} = this.state;
        const errors = validatorDeleteAccount(data);
        if (errors.size > 0) {
            this.setState({
                errors: errors.toJS(),
            });
            showMessage({
                message: t('notifications:text_fill_value'),
                type: 'danger',
            });
        } else {
            this.setState({
                errors: null,
            });
           dispatch(deleteAccount(data, this.saveDataUser));
        }

    };
    saveDataUser = () => {
        const {dispatch} = this.props;
        const {data} = this.state;

        dispatch(
            deleteAccountSuccess({
            }),
        );
        dispatch(signOut());
        this.props.navigation.goBack();
        this.props.navigation.goBack();
    };

    changeData(key, value) {
        const {data} = this.state;
        this.setState({
            data: {
                ...data,
                [key]: value,
            },
        });
    }

    render() {
        const {
            t,
            navigation,
            auth: {pendingDeleteAccount},
        } = this.props;
        const {data, errors} = this.state;
        const {password} = data;

        return (
            <ThemedView isFullView>
                <Header
                    leftComponent={<IconHeader/>}
                    centerComponent={
                        <TextHeader title={t('profile:text_edit_account')}/>
                    }
                />
                <KeyboardAvoidingView style={styles.keyboard}>
                    <ScrollView>
                        <Container>
                            <Input
                                label={t('auth:text_input_password')}
                                value={password}
                                secureTextEntry
                                onChangeText={value => this.changeData('password', value)}
                                error={errors && errors.password}
                            />

                            <Button
                                title={t('common:text_confirm')}
                                containerStyle={styles.button}
                                loading={pendingDeleteAccount}
                                onPress={this.handleDeleteAccount}
                            />
                        </Container>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ThemedView>
        );
    }
}

const styles = StyleSheet.create({
    keyboard: {
        flex: 1,
    },
    description: {
        marginVertical: 4,
    },
    button: {
        marginVertical: margin.big,
    },
});

const mapStateToProps = state => {
    return {
        auth: authSelector(state),
    };
};



export default connect(mapStateToProps, null)(withTranslation()(DeleteAccount));
