const MunicipioEdificios = ({censos, total, calcPercentage}) => {
  return (
    <>
      <h5>
        Total: {total}
      </h5>
      <table className='table table-sm table-edificios'>
        <thead>
          <tr key={censos.N_EDIFICIOS_CLASSICOS}>
            <th
              style={{
                width: `${calcPercentage(
                  censos.N_EDIFICIOS_CLASSICOS,
                  censos.N_EDIFICIOS_CONSTR_ANTES_1945
                )}%`
              }}>
              -1945
            </th>
            <th
              style={{
                width: `${calcPercentage(
                  censos.N_EDIFICIOS_CLASSICOS,
                  censos.N_EDIFICIOS_CONSTR_1946_1980
                )}%`
              }}>
              1946-1980
            </th>
            <th
              style={{
                width: `${calcPercentage(
                  censos.N_EDIFICIOS_CLASSICOS,
                  censos.N_EDIFICIOS_CONSTR_1981_2000
                )}%`
              }}>
              1981-2000
            </th>
            <th
              style={{
                width: `${calcPercentage(
                  censos.N_EDIFICIOS_CLASSICOS,
                  censos.N_EDIFICIOS_CONSTR_2001_2010
                )}%`
              }}>
              2001-2010
            </th>
            <th
              style={{
                width: `${calcPercentage(
                  censos.N_EDIFICIOS_CLASSICOS,
                  censos.N_EDIFICIOS_CONSTR_2011_2021
                )}%`
              }}>
              2011-
            </th>
          </tr>
        </thead>
        <tbody>
          <tr key={censos.N_EDIFICIOS_CLASSICOS}>
            <td
              className='old0'
              style={{
                width: `${calcPercentage(
                  censos.N_EDIFICIOS_CLASSICOS,
                  censos.N_EDIFICIOS_CONSTR_ANTES_1945
                )}%`
              }}>
              <b>
                {calcPercentage(
                  censos.N_EDIFICIOS_CLASSICOS,
                  censos.N_EDIFICIOS_CONSTR_ANTES_1945
                )}
                %
              </b>
            </td>

            <td
              className='old1'
              style={{
                width: `${calcPercentage(
                  censos.N_EDIFICIOS_CLASSICOS,
                  censos.N_EDIFICIOS_CONSTR_1946_1980
                )}%`
              }}>
              <b>
                {calcPercentage(
                  censos.N_EDIFICIOS_CLASSICOS,
                  censos.N_EDIFICIOS_CONSTR_1946_1980
                )}
                %
              </b>
            </td>

            <td
              className='old2'
              style={{
                width: `${calcPercentage(
                  censos.N_EDIFICIOS_CLASSICOS,
                  censos.N_EDIFICIOS_CONSTR_1981_2000
                )}%`
              }}>
              <b>
                {calcPercentage(
                  censos.N_EDIFICIOS_CLASSICOS,
                  censos.N_EDIFICIOS_CONSTR_1981_2000
                )}
                %
              </b>
            </td>

            <td
              className='old3'
              style={{
                width: `${calcPercentage(
                  censos.N_EDIFICIOS_CLASSICOS,
                  censos.N_EDIFICIOS_CONSTR_2001_2010
                )}%`
              }}>
              <b>
                {calcPercentage(
                  censos.N_EDIFICIOS_CLASSICOS,
                  censos.N_EDIFICIOS_CONSTR_2001_2010
                )}
                %
              </b>
            </td>

            <td
              className='old4'
              style={{
                width: `${calcPercentage(
                  censos.N_EDIFICIOS_CLASSICOS,
                  censos.N_EDIFICIOS_CONSTR_2011_2021
                )}%`
              }}>
              <b>
                {calcPercentage(
                  censos.N_EDIFICIOS_CLASSICOS,
                  censos.N_EDIFICIOS_CONSTR_2011_2021
                )}
                %{' '}
              </b>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default MunicipioEdificios
