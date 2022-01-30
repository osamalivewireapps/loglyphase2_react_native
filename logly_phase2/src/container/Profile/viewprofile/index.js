/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from 'react';
import ProfileView from './view';
import { getUser, uploadUserImage } from '../../../actions/LoginModule';
import { connect } from 'react-redux';
import DataHandler from '../../../utils/DataHandler';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker/src/index';
import moment from 'moment';

class ViewProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userObject: {},
            fileUri:''
        }
    }

    goingBack(e) {
        this.props.navigation.pop();
    }

    componentDidMount() {

        
        DataHandler.getAccountType().then((value) => {
            this.accountType = value;
        });

        DataHandler.getUserObject().then((value) => {
            this.userObject = JSON.parse(value);
            this.setState({userObject:this.userObject})
        })

    }

    updateUser() {
        this.props.getUser().then((response)=>{
            DataHandler.saveUserObject(JSON.stringify(response.payload));
            console.log("user object-->",response.payload);
            this.setState({ userObject: response.payload })
        })
    }

    render() {
        return (
            <ProfileView {...this.props}
                userObject={this.state.userObject}
                accountType={this.accountType}
                updateUser={() => this.updateUser()} 

                capturePic={(e) => { this.getPic(e) }}

                imgUri={this.state.fileUri}
                />
        );
    }

    //////////////////////////  CAMERA && GALLERY //////////////////
    options = {
        title: 'Select Image',
        maxWidth: 500,
        maxHeight: 500,
        customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    getPic(txt) {

        if (txt === "camera") {
            launchCamera(this.options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.errorCode) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    console.log('camera----->', response);
                    const source = { uri: response.uri, type: response.type, fileName: response.fileName };
                    this.uploadUserImage(source)
                    //this.setState({ fileUri: response.uri })
                }
            });
        }
        else {
            launchImageLibrary(this.options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri, type: response.type, fileName: response.fileName };
                    this.uploadUserImage(source)
                    //this.setState({ fileUri: response.uri })
                }
            });
        }
    }

    uploadUserImage(source){
        let formdata = new FormData();
        formdata.append('file', {
            uri: source.uri,
            name: 'user_img' + moment().unix() + '.jpg', type: 'image/jpg',
        });
        formdata.append('name','coverImage')
        this.props.uploadUserImage(formdata).then((response)=>{
            if(response){
                this.updateUser()
            }
        })
    }

}

const mapStateToProps = ({ user }) => {

    return {

    };
};

const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(getUser()),
    uploadUserImage: (data) => dispatch(uploadUserImage(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ViewProfile);
