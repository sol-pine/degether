import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

function LeftInfoBar() {
  const { myProjectId } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <ProjectNav
          onClick={() => {
            // 프로젝트 아이디를 이용해 프로젝트 메인 페이지로 이동
            navigate(`/project/${myProjectId}`);
          }}
        >
          프로젝트 정보
        </ProjectNav>
        <ProjectNav
          onClick={() => {
            // 프로젝트 아이디를 이용해 해당 화상회의 페이지로 이동
            navigate(`/video/${myProjectId}`);
          }}
        >
          프로젝트 화상회의
        </ProjectNav>
        <ProjectNav
          onClick={() => {
            // 프로젝트 아이디를 이용해 해당 관리자 프로젝트 페이지로 이동
            navigate(`/meetingnote/${myProjectId}`);
          }}
        >
          프로젝트 회의록
        </ProjectNav>
        <ProjectNav
          onClick={() => {
            // 프로젝트 아이디를 이용해 해당 관리자 프로젝트 페이지로 이동
            navigate(`/admin/${myProjectId}`);
          }}
        >
          프로젝트 관리
        </ProjectNav>
      </Container>
    </div>
  );
}
export default LeftInfoBar;
const Container = styled.div`
  width: 212px;
  height: 400px;
  background: #2f4a3b;
  margin-top: 180px;
`;
const ProjectNav = styled.div`
  width: 212px;
  height: 42px;
  font-weight: 400;
  font-size: 22px;
  color: #fff;
  padding-top: 20px;
  margin-top: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;