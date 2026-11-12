
package com.example.ProHire.repository;

import com.example.ProHire.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    boolean existsByTeamName(String teamName);

    Optional<Team> findByTeamName(String teamName);
}
