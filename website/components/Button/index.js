import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

const index = ({
  className, children, type = 'button', ...props
}) => {
  return (
    <button className={classNames(className, styles.button)} type={type} {...props}> {children} </button>
  );
};

export default index;
