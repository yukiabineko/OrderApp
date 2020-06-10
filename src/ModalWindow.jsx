import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content : {
    top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    width                 : '50%',
    bottom                : 'auto',
    marginRight           : '-50%',
    borderRadius　　　　　　: '4px',
    background            : '#f0f0f0',
    padding               : '10px',
    transform             : 'translate(-50%, -50%)'
 }
};

Modal.setAppElement('#root') //任意のアプリを設定する　create-react-appなら#root


class ModalWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal(num) {
    alert(JSON.stringify(this.state.data));
    this.setState({modalIsOpen: true});
  }
  afterOpenModal() {
    this.subtitle.style.color = '#0000bb';
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>編集</h2>
          <div>Opend</div>
            <button onClick={this.closeModal}>閉じる</button>
        </Modal>
      </div>
    );
  }
}
export default connect((state)=>state)(ModalWindow);