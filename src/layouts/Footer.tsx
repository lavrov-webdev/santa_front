import React, { FC } from "react";
import styles from "./styles.module.scss";

type FooterProps = {};

const Footer: FC<FooterProps> = () => {
  return <div className={styles.footerWrapper}>Footer</div>;
};

export default Footer;
