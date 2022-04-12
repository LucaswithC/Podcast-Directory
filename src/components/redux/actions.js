const actions = store => ({
    activate: (state, data) => ({ detailsStatus: true, detailsData: data }),
    deactivate: state => ({ detailsStatus: false, detailsData: state.detailsData })
  });
   
  export default actions;