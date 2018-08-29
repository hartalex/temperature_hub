export const getActions = dispatch => {
  return {
    actions: {
      fetchDataStart: function(query) {
        dispatch({ type: 'FetchDataStart', query: query })
      },
      fetchDataComplete: function(data, isMore) {
        dispatch({
          type: 'FetchDataComplete',
          data: data,
          isMore: isMore
        })
      },
      setError: function(title, message) {
        dispatch({
          type: 'SetError',
          error: { title: title, description: message }
        })
      }
    }
  }
}
