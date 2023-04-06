import styles from './Nav.module.css'

const Nav = () => {
    return(
        <div className={styles.containerNav}>
            <span>
                <header>
                    <span>
                        <ul>
                       <span> <li>home</li></span>
                        <span><li>lista</li></span>
                        <span><li>iario</li></span>
                        </ul>
                    </span>
                </header>
            </span>
        </div>
    )
}

export default Nav;