using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace React_Demo.Models.Database
{
    public partial class SlackTrainingDbEntities : DbContext
    {
        public SlackTrainingDbEntities()
        {
        }

        public SlackTrainingDbEntities(DbContextOptions<SlackTrainingDbEntities> options)
            : base(options)
        {
        }

        public virtual DbSet<Channel> Channel { get; set; }
        public virtual DbSet<Message> Message { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserChannel> UserChannel { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=SlackTraining;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Channel>(entity =>
            {
                entity.HasIndex(e => e.DisplayName);

                entity.Property(e => e.DisplayName).IsUnicode(false);

                entity.HasOne(d => d.Owner)
                    .WithMany(p => p.Channel)
                    .HasForeignKey(d => d.OwnerId)
                    .HasConstraintName("FK_Channel_User");
            });

            modelBuilder.Entity<Message>(entity =>
            {
                entity.HasIndex(e => new { e.ChannelId, e.Timestamp });

                entity.HasOne(d => d.Channel)
                    .WithMany(p => p.Message)
                    .HasForeignKey(d => d.ChannelId)
                    .HasConstraintName("FK_Message_Channel");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Message)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Message_User");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Username)
                    .IsUnique();

                entity.Property(e => e.DisplayName).IsUnicode(false);

                entity.Property(e => e.Email).IsUnicode(false);

                entity.Property(e => e.Username).IsUnicode(false);
            });

            modelBuilder.Entity<UserChannel>(entity =>
            {
                entity.HasIndex(e => new { e.ChannelId, e.UserId })
                    .IsUnique();

                entity.HasIndex(e => new { e.UserId, e.ChannelId })
                    .IsUnique();

                entity.HasOne(d => d.Channel)
                    .WithMany(p => p.UserChannel)
                    .HasForeignKey(d => d.ChannelId)
                    .HasConstraintName("FK_UserChannel_Channel");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserChannel)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserChannel_User");
            });
        }
    }
}
