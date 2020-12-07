import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


const Alert = ({ alerts }) =>

    // console.log("alerts:", alerts);

    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (

        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
        </div>
    ));


Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
};


const mapStateToProps = (state) => ({
    alerts: state.alert
})

/* connect k andr first parametre mapStateToProps hota hai r 2nd mapDispatchToProps hota hai ,
 agr phly mapStateToProps use nhi ho raha to null hogi first value r 2nd me  mapDispatchToProps aa jaye gi ,
 in below we are using actions it is same like mapDispatchToProps  */
export default connect(mapStateToProps)(Alert);
