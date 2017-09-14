import React, { Component } from 'react';
import { connect } from 'react-redux';
// import classNames from 'classnames';

import { initSignup } from '../../actions';

const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

class Signup extends Component {

  state = { email: '', password: '', confirmPassword: '' }

  handleEmailChange = (e) => {
    if (!regex.test(e.target.value)) {
      this.email.className = 'login-input wrong';
      this.validateEmail.className = 'msg-alert on';
    } else {
      this.email.className = 'login-input';
      this.validateEmail.className = 'msg-alert';
    }
    this.setState({ email: e.target.value });
  }

  handlePasswordChange = (e) => {
    if (e.target.value.trim().length < 6) {
      this.password.className = 'login-input wrong';
      this.validatePassword.className = 'msg-alert on';
    } else {
      this.password.className = 'login-input';
      this.validatePassword.className = 'msg-alert';
    }
    this.setState({ password: e.target.value });
  }

  handleConfirmPassword = (e) => {
    const { password } = this.state;
    if (e.target.value !== password) {
      this.confirmPassword.className = 'login-input wrong';
      this.validateConfirmPassword.className = 'msg-alert on';
    } else {
      this.confirmPassword.className = 'login-input';
      this.validateConfirmPassword.className = 'msg-alert';
    }
    this.setState({ confirmPassword: e.target.value });
  }

  onConfirm = () => {
    const { initSignup, history } = this.props;
    const { email, password, confirmPassword } = this.state;
    if (!regex.test(email)) return;
    if (password.trim().length < 6) return;
    if (email.trim().length > 0 && (password === confirmPassword)) {
      initSignup({ email, password }).then((value) => {
        localStorage.setItem('email', email);
        return value ? history.push('/franchise/addShop') : null;
      });
    }
  }

  render() {
    return (
      <div className="mobile-auth-wrapper" style={{ position: 'relative' }}>
        <div className="login-form">
          <h1>회원가입</h1>
          <div>
            <label className="login-label" style={{ display: 'inline' }}>이메일</label>
            <span className="msg-alert" ref={(validateEmail) => this.validateEmail = validateEmail}>
              올바른 이메일 형식이 아닙니다.
            </span>
            <input
              ref={(email) => this.email = email}
              type="email"
              className="login-input"
              onChange={(e) => this.handleEmailChange(e)}
            />
            <label className="login-label" style={{ display: 'inline' }}>비밀번호</label>
            <span
              className="msg-alert"
              ref={(validatePassword) => this.validatePassword = validatePassword}
            >
              비밀번호는 6자리 이상입니다.
            </span>
            <input
              ref={(password) => this.password = password}
              type="password"
              className="login-input"
              onChange={(e) => this.handlePasswordChange(e)}
            />
            <label className="login-label" style={{ display: 'inline' }}>비밀번호 확인</label>
            <span
              className="msg-alert"
              ref={(validateConfirmPassword) => this.validateConfirmPassword = validateConfirmPassword}
            >
              비밀번호를 확인해주세요.
            </span>
            <input
              ref={(confirmPassword) => this.confirmPassword = confirmPassword}
              type="password"
              className="login-input"
              onChange={(e) => this.handleConfirmPassword(e)}
            />
            <button className="btn-login" onClick={() => this.onConfirm()}>
              회원가입하기
            </button>
          </div>
        </div>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    initSignup: (user) => dispatch(initSignup(user))
  };
};

export default connect(undefined, mapDispatchToProps)(Signup);
