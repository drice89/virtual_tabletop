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
        if(this.state.imageFile){
            const formData = new FormData();
            const { processForm } = this.props;
            const { creatorId, imageFile } = this.state;
            formData.append('creatorId', creatorId);
            formData.append('imageFile', imageFile);
            processForm(formData);
        }
    }

    handleImage(e) {
        const img = e.target.files[0];

        this.setState({ imageFile: img });
    }

    handleChange(form) {
        return (e) => {
            this.setState({ [form]: e.target.value });
        };
    }

    render() {
        const { errors, formType } = this.props;
        const { name, description, backgroundImage } = this.state;
        return (
            <div className={styles.container}>
                <div className={styles.logo}>
                    <i className="ra ra-queen-crown" />
                    <p>Create New Piece</p>
                </div>
                <form className={styles.formContainer} onSubmit={this.handleSubmit}>
                    <div className={styles.uploadPieceButtonImage}>
                        <button className={styles.uploadPiece}>Upload piece</button>
                        <img src={this.state.previewUrl} className={styles.previewUrl}/>
                    </div>
                    <button type="submit" className={buttons.secondary}>{formType}</button>
                </form>
            </div>
        );
    }
}

export default CreatePiece;
