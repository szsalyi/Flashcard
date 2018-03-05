package com.github.szsalyi.flashcard.cards;

import com.github.szsalyi.flashcard.common.BaseEntity;
import com.github.szsalyi.flashcard.categories.CategoryEntity;
import com.github.szsalyi.flashcard.users.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Set;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "card")
public class CardEntity extends BaseEntity {

    private static final Long serialVersionUID = 1L;

    private String front;

    private String back;

    @ManyToOne()
    private UserEntity user;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable()
    private Set<CategoryEntity> category;

}