/* eslint-disable prettier/prettier */
import React from 'react'
import { StyleSheet, View, Modal, ActivityIndicator, Platform } from 'react-native'
import { connect } from 'react-redux';

function Loader(props) {


    const styles = StyleSheet.create({
        modalBackground: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-around',
            backgroundColor: '#rgba(0, 0, 0, 0.5)',
            zIndex: 1000
        },
        activityIndicatorWrapper: {
            // backgroundColor: '#FFFFFF',
            height: 100,
            width: 100,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
        }
    });


    return (
        <>
            {props.children}
            {/* <FlashMessage position="bottom" titleStyle={{ marginBottom: -10 }} style={{ marginBottom: -5 }} /> */}
            <Modal
                transparent={true}
                animationType={'none'}
                visible={props.loader.isLoading}
                style={{ zIndex: 1100 }}
                onRequestClose={() => { }}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator size={80} color="green" />
                    </View>
                </View>
            </Modal>


        </>
    )
}



const mapStateToProps = (state) => {
    return { loader: state.loader };
}

export default connect(mapStateToProps)(Loader);