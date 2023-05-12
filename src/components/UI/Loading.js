import { ThreeDots } from "react-loader-spinner";
import classes from './Loading.module.css';

const Loading = () => {
    return (
        <div className={classes.loading}>
            <ThreeDots
                height="120"
                width="120"
                radius="9"
                color="#862706"
                ariaLabel="three-dots-loading"
                visible={true}
            />
        </div>
    )
}

export default Loading;