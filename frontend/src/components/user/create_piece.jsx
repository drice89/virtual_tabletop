import React from 'react';
import styles from './create_game.module.scss';
import buttons from '../buttons.module.scss';

class CreatePiece extends React.Component {
    constructor(props) {
        super(props);

        const { creatorId } = this.props;

        this.state = {
            imageFile: null,
            creatorId,
            previewUrl: null,
            error: null,
            uploading: null
        }
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImage = this.handleImage.bind(this);
    }

    componentDidMount() {
        // const { clearErrors } = this.props;
        // clearErrors();
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.imageFile && !this.state.uploading){
            this.setState({uploading: true})
            const formData = new FormData();
            const { processForm } = this.props;
            const { creatorId, imageFile } = this.state;
            formData.append('creatorId', creatorId);
            formData.append('imageFile', imageFile);
            processForm(formData)
                .then(() => this.props.toggleCreatePiece());
        }
    }

    handleImageClick(e){
        e.preventDefault();
        document.getElementById('imageFilePiece').click();
    }

    handleImage(e) {
        const img = e.currentTarget.files[0];

        const fileReader = new FileReader();

        fileReader.onloadend = () => {

            var t = img.type.split('/').pop().toLowerCase();
            if (t != "jpeg" && t != "jpg" && t != "png" && t != "bmp" && t != "gif") {
                this.setState({error: "Invalid file type. Try again.", previewUrl: null, imageFile: null})
            }else{
                this.setState({ imageFile: img, previewUrl: fileReader.result, error: null });
            }
        };
        if (img) {
            fileReader.readAsDataURL(img);
        }
    }

    handleChange(form) {
        return (e) => {
            this.setState({ [form]: e.target.value });
        };
    }

    render() {
        {/* <form className={styles.formContainer} onSubmit={this.handleSubmit}>
            {errors ? <span className={styles.errors}>{errors}</span> : ''}
           
            <button type="submit" className={buttons.secondary}>{formType}</button>
          </form> */}
        const { errors, formType } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.logo}>
                    <i className="ra ra-queen-crown" />
                    <p>Create New Piece</p>
                </div>
                <form className={styles.formContainer} >
                    <input type="file" id="imageFilePiece" style={{display: 'none'}} onChange={this.handleImage} />
                    <div className={styles.uploadPieceButtonImage}>
                        <button className={styles.uploadPiece} onClick={this.handleImageClick} >Upload piece</button>
                        <img src={this.state.previewUrl} className={styles.previewUrl}/>
                    </div>
                    {this.state.error ? <p className={styles.uploadError}>{this.state.error}</p> : null}
                    {this.state.uploading ? <p className={styles.uploadError}>Image is uploading...</p> : null}
                    <button type="submit" className={buttons.secondary} onClick={this.handleSubmit}>{formType}</button>
                </form>
            </div>
        );
    }
}

export default CreatePiece;
