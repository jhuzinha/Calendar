import styled from 'styled-components';

export const ContainerCalendar = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    .rbc-event{
        background-color: #4a1a9733;
    }
    .rbc-event :active{
        border: 1px solid #4a1a97ce;
    }
    .rbc-toolbar{
        font-size: 20px;
    }
`