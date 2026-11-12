
package com.example.ProHire.service;

import com.example.ProHire.entity.Team;
import com.example.ProHire.repository.TeamRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    // Create Team
    public Team createTeam(Team team) {

        if (teamRepository.existsByTeamName(team.getTeamName())) {
            throw new RuntimeException("Team already exists!");
        }

        team.setStatus("ACTIVE");

        return teamRepository.save(team);
    }

    // Get All Teams
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }
}
